import {
  useEffect,
  type ReactNode,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const BaseModal = ({ isOpen, onClose, children }: ModalProps) => {
  // ESC 키로 닫기 (열려 있을 때만 리스너 등록)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={classes["modal-overlay"]} onClick={onClose}>
      <div
        className={classes["modal-content"]}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

/* ===== 서브컴포넌트 ===== */
type ActionsProps = HTMLAttributes<HTMLDivElement>;
const Actions = ({ className = "", ...rest }: ActionsProps) => (
  <div className={`${classes["modal-actions"]} ${className}`} {...rest} />
);

type TitleProps = HTMLAttributes<HTMLHeadingElement>;
const Title = ({ className = "", ...rest }: TitleProps) => (
  <h2 className={`${classes["modal-title"]} ${className}`} {...rest} />
);

type ModalTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea = ({ className = "", ...rest }: ModalTextareaProps) => (
  <textarea className={`${classes["modal-textarea"]} ${className}`} {...rest} />
);

/* ===== default export 유지 + 정적 속성 부여 ===== */
type ModalComponent = typeof BaseModal & {
  Actions: typeof Actions;
  Title: typeof Title;
  Textarea: typeof Textarea;
};

const Modal = BaseModal as ModalComponent;
Modal.Actions = Actions;
Modal.Title = Title;
Modal.Textarea = Textarea;

export default Modal;
