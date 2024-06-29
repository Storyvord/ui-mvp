import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ComplianceCardProps {
  compliance: any
}

const ComplianceCard: FC<ComplianceCardProps> = ({compliance}) => {
  return (
    <Card className="p-2 md:p-4">
        <CardHeader>
          <CardTitle className="uppercase">
            {compliance.location}
          </CardTitle>
          <div className="flex justify-between flex-wrap gap-2">
            <p className="text-gray-500 text-base">
              {compliance.time_frame}
            </p>
            <p className="text-gray-500 text-base">
              <strong>Mode: </strong>
              {compliance.mode}
            </p>
            <p className="text-gray-500 text-base">
              <strong>Crew Size: </strong>
              {compliance.crew_size}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <Markdown remarkPlugins={[remarkGfm]}>{compliance.report}</Markdown>
        </CardContent>
    </Card>
  )
}

export default ComplianceCard