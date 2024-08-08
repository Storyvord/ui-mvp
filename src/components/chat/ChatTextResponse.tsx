import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

interface ChatTextResponseProps {
  data: string;
}

export const ChatTextResponse: React.FC<ChatTextResponseProps> = ({ data }) => {
  return (
    <>
      <Markdown
        components={{
          a({ children, href }) {
            return (
              <a href={href} target={"_blank"}>
                {children}
              </a>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {data}
      </Markdown>
    </>
  );
};
