export const UPDATE_SETTING = 'UPDATE_SETTING';

export function updateSetting(setting) {
  return {
    type: UPDATE_SETTING,
    setting
  }
}
