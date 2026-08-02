#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//! Thin shell for hosted TSM.
//! Window URL is configured in `tauri.conf.json` (`app.windows[0].url`).
//! For staging/prod builds, point that URL (or override via build script) at `https://tsm…`.
//! NEVER embed TranZfort service_role keys in this crate.

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .run(tauri::generate_context!())
    .expect("error while running TSM desktop");
}
