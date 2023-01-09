import {
  Button as PrimeButton,
  ButtonProps as PrimeButtonProps,
} from "primereact/button";
import { classNames } from "primereact/utils";
import "./button.scss";

interface ButtonProps extends PrimeButtonProps {}

export const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <PrimeButton
      {...props}
      className={classNames({ [className]: !!className }, "button")}
    />
  );
};
