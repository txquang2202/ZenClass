// LanguageSwitcher.js
import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>En</button>
      <button onClick={() => changeLanguage("fr")}>Vi</button>
    </div>
  );
}

export default LanguageSwitcher;
