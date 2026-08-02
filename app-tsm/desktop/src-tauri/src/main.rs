#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//! Thin shell for hosted TSM.
//! Start URL is written into `tauri.conf.json` by `scripts/apply-desktop-url.mjs`
//! (`TSM_DESKTOP_URL`). NEVER embed TranZfort service_role keys in this crate.

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .run(tauri::generate_context!())
    .expect("error while running TSM desktop");
}
