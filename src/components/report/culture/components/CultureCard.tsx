import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CultureCardProps {
  location: string,
  details: string
}

const CultureCard: FC<CultureCardProps> = ({location, details}) => {
  return (
    <Card className="p-2 md:p-4">
        <CardHeader>
          <CardTitle className="uppercase">
            {location}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Markdown remarkPlugins={[remarkGfm]}>{details}</Markdown>
        </CardContent>
    </Card>
  )
}

export default CultureCard