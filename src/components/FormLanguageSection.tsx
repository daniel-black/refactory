import { LanguageComboBox } from "./LanguageComboBox";
import { H2 } from "./typography/H2";
import { LanguageIdentifier } from "@/utils/languages";

type FormLanguageSectionProps = {
  language: LanguageIdentifier;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageIdentifier>>;
};

export function FormLanguageSection(props: FormLanguageSectionProps) {
  return (
    <div className="space-y-2">
      <H2>Programming&nbsp;language</H2>
      <LanguageComboBox
        selectedLanguage={props.language}
        setSelectedLanguage={props.setLanguage}
      />
    </div>
  );
}
