import { Metadata } from 'next'
import { ResearchAssistantship } from '@/components/work-with-us/ResearchAssistantship'

export const metadata: Metadata = {
  title: 'Research Assistantship - GCADR',
  description: 'Join our research team as a research assistant. Contribute to cutting-edge ADR research and publications.',
  keywords: ['Research Assistant', 'ADR Research', 'GCADR Research', 'Academic Research'],
}

export default function ResearchPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-primary-700 text-white py-16">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Research Assistantship
            </h1>
            <p className="text-xl text-accent-200">
              Contribute to groundbreaking research in alternative dispute resolution 
              and advance your academic career.
            </p>
          </div>
        </div>
      </div>
      <ResearchAssistantship />
    </div>
  )
}
