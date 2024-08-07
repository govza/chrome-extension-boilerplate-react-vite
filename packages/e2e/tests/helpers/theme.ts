/**
 * Helper method to check if user can click on theme button and toggle theme color
 */
export const canSwitchTheme = async (): Promise<void> => {
  const lightThemeColor = 'rgb(238, 238, 238)';
  const darkThemeColor = 'rgb(34, 34, 34)';

  const app = await $('.App');
  expect(app).not.toBeNull();

  const toggleThemeButton = await $('button');
  expect(toggleThemeButton).not.toBeNull();

  let currentThemeColor = await app.getCSSProperty('background-color');

  const expectedThemeColorAfterClick = currentThemeColor.value === lightThemeColor ? darkThemeColor : lightThemeColor;

  await toggleThemeButton.click();

  currentThemeColor = await app.getCSSProperty('background-color');

  expect(currentThemeColor.value).toBe(expectedThemeColorAfterClick);
};
