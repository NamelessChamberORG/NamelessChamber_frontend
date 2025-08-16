import FullScreenOff from "../../assets/icons/FullScreenOff";
import FullScreenOn from "../../assets/icons/FullScreenOn";
import Button from "../button/Button";
import { useFullscreen } from "../../hooks/useFullscreen";

type Props = {
  targetRef?:
    | React.RefObject<HTMLElement | null>
    | React.MutableRefObject<HTMLElement | null>;
  alwaysHoverStyle?: boolean;
  disabled?: boolean;
};

export default function FullscreenToggleButton({
  targetRef,
  alwaysHoverStyle,
  disabled,
}: Props) {
  const { isFullscreen, toggle } = useFullscreen(targetRef);

  return (
    <Button
      alwaysHoverStyle={alwaysHoverStyle}
      onClick={toggle}
      disabled={disabled}
    >
      {isFullscreen ? <FullScreenOff /> : <FullScreenOn />}
    </Button>
  );
}
