export interface NotificationProps {
  text: string;
  id: number;
  removeNotif: (id: number) => void;
};