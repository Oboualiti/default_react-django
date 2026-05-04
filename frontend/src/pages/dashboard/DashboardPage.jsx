import React from 'react';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import HealthDot from '../../components/ui/HealthDot';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Welcome to the starter template — overview of your application
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="128" accentColor="blue" percentage="+12%" trend="positive" />
        <StatCard title="Active" value="96" accentColor="green" percentage="75%" trend="positive" />
        <StatCard title="Pending" value="24" accentColor="yellow" percentage="19%" trend="neutral" />
        <StatCard title="Errors" value="8" accentColor="red" percentage="-3%" trend="negative" />
      </div>

      {/* Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <div className="bg-app-card rounded-xl border border-border-default p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { name: 'API Server', status: 'good' },
              { name: 'Database', status: 'good' },
              { name: 'Cache', status: 'warning' },
              { name: 'Worker Queue', status: 'error' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{item.name}</span>
                <div className="flex items-center gap-2">
                  <HealthDot status={item.status} pulse={item.status !== 'good'} />
                  <span className="text-xs text-text-muted capitalize">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-app-card rounded-xl border border-border-default p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Badge Examples</h3>
          <div className="flex flex-wrap gap-2">
            <Badge label="Active" color="green" />
            <Badge label="Pending" color="yellow" />
            <Badge label="Error" color="red" />
            <Badge label="Info" color="blue" />
            <Badge label="Special" color="purple" />
            <Badge label="Default" color="gray" />
            <Badge label="Custom" color="#10b981" />
            <Badge label="Outline" color="blue" variant="outline" />
            <Badge label="With Dot" color="green" dot />
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-app-card rounded-xl border border-border-default p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Template Info</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-text-muted">Framework</span>
            <p className="text-text-primary font-medium">React 19</p>
          </div>
          <div>
            <span className="text-text-muted">Styling</span>
            <p className="text-text-primary font-medium">Tailwind CSS 4</p>
          </div>
          <div>
            <span className="text-text-muted">Build Tool</span>
            <p className="text-text-primary font-medium">Vite 7</p>
          </div>
          <div>
            <span className="text-text-muted">Backend</span>
            <p className="text-text-primary font-medium">Django REST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
