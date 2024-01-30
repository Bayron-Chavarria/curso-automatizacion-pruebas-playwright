import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/'); //Se encuentra global en config
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  await page.getByRole('button', {name: "Search"}).click();

  await page.getByPlaceholder('Search docs').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  await expect(page.locator('.DocSearch-NoResults p')).toBeVisible();

  await expect(page.locator('.DocSearch-NoResults p')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toHaveAttribute('value',"somerandomtext");

  await page.getByRole('button', { name: 'Clear the query' }).click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  await expect(searchBox).toHaveAttribute("value",'havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});

test.only('Dar click a la primera opción de búsqueda', async ({ page }) => {

  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox1 = page.getByPlaceholder('Search docs');

  await searchBox1.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  await expect(searchBox1).toHaveAttribute("value",'havetext');


  await page.getByRole('link', { name: 'toHaveText​ LocatorAssertions' }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-text');

});