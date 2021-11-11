//styles
import './ThemeSelector.css';
import { BiFontSize } from "react-icons/bi";
import modeIcon from '../assets/mode-icon.svg';

import { useTheme } from '../hooks/useTheme';

const themeColors = ['#58249c', '#249c6b', '#b70233'];
const fontSize = ['16px', '20px', '22px'];

export default function ThemeSelector() {

    const { changeColor, changeFontSize, changeMode, mode } = useTheme();

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="theme-selector">
            <div className="mode-toggle">
                <img
                    onClick={toggleMode}
                    src={modeIcon}
                    alt="mode icon"
                    style={{ filter: mode === "dark" ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>
            <div className="theme-buttons">
                {themeColors.map((color) => (
                    <div
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
            <div className="theme-buttons">
                {fontSize.map(text => (
                    <div alt="increase text size" onClick={() => changeFontSize(text)}>
                        <BiFontSize style={{ fontSize: text, filter: mode === "dark" ? 'invert(100%)' : 'invert(20%)' }} />
                    </div>
                ))}
            </div>
        </div >
    )
}
