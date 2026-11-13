import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRoutineRecommendation,
  validateBookingInput,
  formatCurrencyCOP,
  calculateSavingsPercentage,
} from './fitnessLogic.ts';

test('calculateRoutineRecommendation creates custom dance & fat loss plan', () => {
  const plan = calculateRoutineRecommendation('fat_loss', 'principiante', 4);
  assert.equal(plan.weeklyDays, 4);
  assert.equal(plan.title, 'Plan Rumba Burn & Tonificación');
  assert.equal(plan.daysSchedule.length, 4);
  assert.ok(plan.calorieTargetWeekly > 1000);
});

test('calculateRoutineRecommendation creates hypertrophy plan with Push Pull Legs', () => {
  const plan = calculateRoutineRecommendation('hypertrophy', 'intermedio', 3);
  assert.equal(plan.weeklyDays, 3);
  assert.equal(plan.splitName, 'Push - Pull - Legs (Empuje, Tracción, Pierna)');
  assert.ok(plan.daysSchedule.some((d) => d.focus.includes('Empuje')));
});

test('validateBookingInput rejects short names or invalid phones', () => {
  const res1 = validateBookingInput({
    userName: 'Al',
    userPhone: '3111234567',
    availableSpots: 5,
  });
  assert.equal(res1.isValid, false);
  assert.ok(res1.error?.includes('nombre'));

  const res2 = validateBookingInput({
    userName: 'Alejandro Toro',
    userPhone: 'abc',
    availableSpots: 5,
  });
  assert.equal(res2.isValid, false);
  assert.ok(res2.error?.includes('teléfono'));

  const res3 = validateBookingInput({
    userName: 'Alejandro Toro',
    userPhone: '3117894520',
    availableSpots: 0,
  });
  assert.equal(res3.isValid, false);
  assert.ok(res3.error?.includes('cupos'));

  const resSuccess = validateBookingInput({
    userName: 'Alejandro Toro',
    userPhone: '+57 311 789 4520',
    userEmail: 'alejo@example.com',
    availableSpots: 10,
  });
  assert.equal(resSuccess.isValid, true);
});

test('calculateSavingsPercentage calculates membership discounts correctly', () => {
  // Monthly $110,000 COP, 3 months full = $330,000, plan is $280,000 -> $50,000 discount -> 15%
  const savingsQuarter = calculateSavingsPercentage(110000, 280000, 3);
  assert.equal(savingsQuarter, 15);

  // Annual: 12 * 110,000 = 1,320,000, plan is 890,000 -> saving 430,000 -> ~33%
  const savingsAnnual = calculateSavingsPercentage(110000, 890000, 12);
  assert.equal(savingsAnnual, 33);
});

test('formatCurrencyCOP formats Colombian pesos cleanly', () => {
  const formatted = formatCurrencyCOP(110000);
  assert.ok(formatted.includes('110.000') || formatted.includes('110,000'));
});
