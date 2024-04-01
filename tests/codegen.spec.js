
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const todoInput =  page.getByPlaceholder('What needs to be done?')
    await todoInput.click();
    await todoInput.fill('Learn codegen');
    await todoInput.press('Enter');

    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toContainText('Learn codegen');

    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('test value');
    await expect(page.getByPlaceholder('What needs to be done?')).toHaveValue('test value');
    await page.pause()
});

test('test 2', async ({page}) => {
    await page.goto('https://qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Guest log in' }).click();
    await page.getByRole('link', { name: ' Fuel expenses' }).click();
    await page.getByText('Fuel expensesAdd an expense').click();
    await page.getByRole('link', { name: ' Garage' }).click();
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.getByLabel('Brand').selectOption('2: 3');
    await page.getByLabel('Model').selectOption('13: 14');
    await page.getByLabel('Mileage').click();
    await page.getByLabel('Mileage').fill('123');
    await page.getByRole('button', { name: 'Add' }).click();
})