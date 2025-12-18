export interface AlertItem {
  id: string;
  time: string;
  dateTime: string; 
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}
