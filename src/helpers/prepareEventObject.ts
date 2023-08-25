import { format, parse } from "date-fns";

type PrepareEventObjectProps = {
  id?: string;
  name: string;
  color: string;
  date: Date;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
};

// Function to convert 24-hour format to AM/PM format
const formatToAMPM = (time: string) => {
  const parsedTime = parse(time, "HH:mm", new Date());
  return format(parsedTime, "h:mm a");
};

export const prepareEventObject = ({
  id,
  name,
  color,
  date,
  startTime,
  endTime,
  allDay,
}: PrepareEventObjectProps) => {
  return {
    id: id,
    name: name,
    color: color,
    date: date,
    allDay: allDay,
    startTime: allDay ? undefined : formatToAMPM(startTime || ""),
    endTime: allDay ? undefined : formatToAMPM(endTime || ""),
  };
};
