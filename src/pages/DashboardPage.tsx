import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, FolderOpen, Calendar, Users } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import type { Project } from '../types/project'

export function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Load projects from sessionStorage
    const loaded: Project[] = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key?.startsWith('project-')) {
        try {
          loaded.push(JSON.parse(sessionStorage.getItem(key)!))
        } catch {
          // skip invalid entries
        }
      }
    }
    loaded.sort((a, b) => (b.id > a.id ? 1 : -1))
    setProjects(loaded)
  }, [])

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <FolderOpen className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">No projects yet</h2>
        <p className="text-slate-600 mb-6 text-center max-w-md">
          Create your first project to find the most cost-efficient city for your corporate event.
        </p>
        <Link to="/app/projects/new">
          <Button size="lg">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create First Project
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/app/projects/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const statusVariant =
            project.status === 'paid' ? 'success' :
            project.status === 'completed' ? 'info' :
            'default'

          return (
            <Link key={project.id} to={`/app/projects/${project.id}`}>
              <Card className="p-5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">
                    {project.name || 'Untitled Project'}
                  </h3>
                  <Badge variant={statusVariant}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{project.dateRangeStart} to {project.dateRangeEnd}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>
                      {project.totalParticipants} participants from {project.offices?.length || 0} offices
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
