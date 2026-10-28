import { AuditDetails } from "@/types/audit"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Button } from "../ui/button"
import { AlertCircleIcon, CheckCircle2Icon, ChevronDownIcon } from "lucide-react"
import { Card, CardContent } from "../ui/card"

interface AuditCardProps {
  comprovante?: boolean
  audit?: AuditDetails
  position?: number
}

export function AuditCard({ comprovante, audit, position }: AuditCardProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-2">
            {!comprovante && (<span className="text-2xl font-bold text-secondary font-serif">#{position} • {audit?.bidderName}</span>)}
        
            <div className="w-full flex">
              <div className={`flex ${audit?.isValid ? "text-green-400" : "text-red-400"} gap-2`}>
                {audit?.isValid ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                <div>
                  {audit?.isValid ? 'Lance integro' : 'Lance fraudado'}
                </div> 
              </div>
            </div>
          </div>
          {!comprovante && <span className="text-2xl font-serif">R$ {Number(audit?.amount).toFixed(2)}</span>}
        </div>
        
        <Card className="w-full p-0 mt-2">
          <Collapsible>
            <CollapsibleTrigger
              render={
              <Button className="w-full">
                Mostrar detalhes de Integridade
                <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
              </Button>}
            />
            <CollapsibleContent>
              
              <CardContent className="flex flex-col w-full py-5 gap-1">
                <div className="inline-block wrap-break-word">
                  <span className="font-bold text-secondary font-seri">Hash Anterior:</span> 
                  <span> {audit?.previousHash}</span>
                </div>
                <div className="inline-block wrap-break-word">
                  <span className="font-bold text-secondary">Hash:</span>
                  <span> {audit?.storedHash}</span>
                </div>
                <div className="inline-block wrap-break-word">
                  <span className="font-bold text-secondary">Hash Calculada:</span>
                  <span > {audit?.calculatedHash}</span>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>  
        </Card>
      </div>
    </div>
  )
}