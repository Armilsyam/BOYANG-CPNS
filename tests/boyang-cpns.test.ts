import test from "node:test";
import assert from "node:assert/strict";
import { FORMASI_INSTANSI, getDisplayName, getPdfUrl } from "../src/data/formasi";
import { TRYOUT_QUESTIONS } from "../src/data/tryout";
import { ACCESS_PRICE_IDR, SSCASN_CHECKLIST } from "../src/data/resources";
import {
  computeMidtransSignature,
  generateAccessCode,
  mapMidtransStatus,
  verifyMidtransSignature,
} from "../src/lib/midtrans";
import {
  FORMASI_PORTAL_URL,
  buildAdminWhatsappUrl,
  getAdminWhatsapp,
  getAdminWhatsappDisplay,
  getPaidWaChannelUrl,
  isAdminEmail,
  normalizeWhatsappNumber,
  STATIC_QRIS_MERCHANT,
} from "../src/lib/admin";
import { gradeTryoutAnswers } from "../src/lib/tryout-scoring";

test("Formasi dataset has all 304 official agency records", () => {
  assert.equal(FORMASI_INSTANSI.length, 304);
  const byLv = FORMASI_INSTANSI.reduce<Record<string, number>>((acc, item) => {
    acc[item.lv] = (acc[item.lv] || 0) + 1;
    return acc;
  }, {});
  assert.equal(byLv.P, 67);
  assert.equal(byLv.V, 26);
  assert.equal(byLv.B, 166);
  assert.equal(byLv.T, 45);

  for (const item of FORMASI_INSTANSI) {
    assert.ok(item.id.length > 10, `Missing Drive ID for ${item.name}`);
    assert.ok(getDisplayName(item).length > 0);
    assert.match(getPdfUrl(item.id), /^https:\/\/drive\.google\.com\/file\/d\/.+\/view$/);
  }
});

test("Pricing is locked to Rp 10.000 and checklist has 7 steps", () => {
  assert.equal(ACCESS_PRICE_IDR, 10000);
  assert.equal(SSCASN_CHECKLIST.length, 7);
});

test("Tryout question bank has 30 balanced TWK/TIU/TKP items", () => {
  assert.equal(TRYOUT_QUESTIONS.length, 30);
  assert.equal(TRYOUT_QUESTIONS.filter((q) => q.category === "TWK").length, 10);
  assert.equal(TRYOUT_QUESTIONS.filter((q) => q.category === "TIU").length, 10);
  assert.equal(TRYOUT_QUESTIONS.filter((q) => q.category === "TKP").length, 10);

  for (const q of TRYOUT_QUESTIONS) {
    assert.equal(q.options.length, 5);
    assert.ok(q.explanation.length > 20);
  }
});

test("Tryout scoring grades perfect answers above passing grade and empty answers below", () => {
  const perfectAnswers: Record<string, string> = {};
  for (const q of TRYOUT_QUESTIONS) {
    const best = [...q.options].sort((a, b) => b.score - a.score)[0];
    perfectAnswers[q.id] = best.label;
  }

  const perfect = gradeTryoutAnswers("all", perfectAnswers);
  assert.equal(perfect.twkScore, 50);
  assert.equal(perfect.tiuScore, 50);
  assert.equal(perfect.tkpScore, 50);
  assert.equal(perfect.totalScore, 150);
  assert.equal(perfect.passedPassingGrade, true);

  const empty = gradeTryoutAnswers("all", {});
  assert.equal(empty.totalScore, 0);
  assert.equal(empty.passedPassingGrade, false);
});

test("Midtrans SHA-512 signature verification rejects tampering", () => {
  const serverKey = "SB-Mid-server-TestKeyForUnitTesting";
  const orderId = "BYG-1700000000-ABC123";
  const statusCode = "200";
  const grossAmount = "10000.00";

  const sig = computeMidtransSignature(orderId, statusCode, grossAmount, serverKey);

  assert.equal(
    verifyMidtransSignature({
      orderId,
      statusCode,
      grossAmount,
      signatureKey: sig,
      serverKey,
    }),
    true
  );

  assert.equal(
    verifyMidtransSignature({
      orderId,
      statusCode,
      grossAmount: "1000.00",
      signatureKey: sig,
      serverKey,
    }),
    false
  );

  assert.equal(mapMidtransStatus("settlement"), "settlement");
  assert.equal(mapMidtransStatus("capture", "accept"), "settlement");
  assert.equal(mapMidtransStatus("capture", "deny"), "deny");
  assert.equal(mapMidtransStatus("expire"), "expire");
  assert.match(generateAccessCode(), /^BYG-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
});

test("Static merchant QRIS and admin email matching work correctly", () => {
  assert.equal(STATIC_QRIS_MERCHANT.merchantName, "PODCAST MANDAR, Service");
  assert.equal(STATIC_QRIS_MERCHANT.nmid, "ID1025386863944");
  assert.equal(STATIC_QRIS_MERCHANT.imagePath, "/qris-boyang.jpg");

  const prev = process.env.ADMIN_EMAILS;
  process.env.ADMIN_EMAILS = "admin@boyang.id, Muh.ArmilSyamsyam@gmail.com";
  assert.equal(isAdminEmail("muh.armilsyamsyam@gmail.com"), true);
  assert.equal(isAdminEmail("user@example.com"), false);
  process.env.ADMIN_EMAILS = prev;
});

test("WhatsApp defaults and normalization target admin 082291544262 and paid channel", () => {
  assert.equal(normalizeWhatsappNumber("0822-9154-4262"), "6282291544262");
  assert.equal(normalizeWhatsappNumber("+62 822 9154 4262"), "6282291544262");
  assert.equal(getAdminWhatsapp(), "6282291544262");
  assert.equal(getAdminWhatsappDisplay(), "082291544262");
  assert.equal(
    getPaidWaChannelUrl(),
    "https://whatsapp.com/channel/0029VbEZ6tr6rsQx50YzfI0p"
  );
  assert.match(
    buildAdminWhatsappUrl("Tes Konfirmasi"),
    /^https:\/\/wa\.me\/6282291544262\?text=/
  );
  assert.equal(FORMASI_PORTAL_URL, "https://formasi-cpns-2024-jadiasn.vercel.app/");

  // Verify multiple generated access codes are unique across different emails
  const codes = new Set(Array.from({ length: 50 }, () => generateAccessCode()));
  assert.equal(codes.size, 50);
});
