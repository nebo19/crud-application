import { useEffect, useRef } from "react";
import { Toast as PrimeToast } from "primereact/toast";
import { hideToast } from "./toast-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const Toast = () => {
  const { summary, content, severity } = useAppSelector(
    (state: any) => state.toast
  );
  const ref = useRef<PrimeToast>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (severity) {
      ref.current?.show({
        summary,
        content,
        severity,
        life: 3000,
      });
    }
  }, [summary, content, severity]);

  const onHide = () => {
    dispatch(hideToast());
  };

  return <PrimeToast ref={ref} onHide={onHide} />;
};
