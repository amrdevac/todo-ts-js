import { RootState } from "@/state/RTK/store";
import { useSelector } from "react-redux";

const ValidationText = ({
  inputName,
  className,
}: {
  inputName: string;
  className?: string;
}) => {
  const mainState = useSelector((state: RootState) => state.validation);
  return (
    <div className={`${className} text-red-600 text-sm`}>
      {mainState.validation[inputName]}
    </div>
  );
};

export default ValidationText;
