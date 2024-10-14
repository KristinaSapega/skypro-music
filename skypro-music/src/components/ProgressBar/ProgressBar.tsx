import styles from "./ProgressBar.module.css"

type ProgressBarProps = {
    max: number | undefined;
    value: number;
    step: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProgressBar({ max, value, step, onChange }: ProgressBarProps) {
    const progressPercentage = (value / (max || 1)) * 100;

    return (
      <input
          className={styles.styledProgressInput} // Применение стилей к ползунку
          type="range" // Тип элемента - ползунок
          min="0" // Минимальное значение ползунка
          max={max} // Максимальное значение, зависит от длительности аудио
          value={value} // Текущее значение ползунка
          step={step} // Шаг изменения значения
          onChange={onChange} // Обработчик события изменения
          
        />
    );
  }

