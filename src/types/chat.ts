type ChatConversation = {
  data: string;
  queryType?: "question" | "answer";
  timestamp?: string;
};

type Session = {
  id: Number;
  title?: string;
  session_id: String;
  user?: Number;
  created_at?: String;
};
