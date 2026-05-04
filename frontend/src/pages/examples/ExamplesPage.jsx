import React, { useState, useMemo } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Dropdown from '../../components/ui/Dropdown';
import MultiSelect from '../../components/ui/MultiSelect';
import SearchableSelect from '../../components/ui/SearchableSelect';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import SearchBar from '../../components/ui/SearchBar';
import HealthDot from '../../components/ui/HealthDot';
import StatCard from '../../components/ui/StatCard';

const DEMO_OPTIONS = [
  { value: '1', label: 'Option Alpha' },
  { value: '2', label: 'Option Beta' },
  { value: '3', label: 'Option Gamma' },
  { value: '4', label: 'Option Delta' },
  { value: '5', label: 'Option Epsilon' },
];

const DEMO_TABLE_DATA = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Pending' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Inactive' },
  { id: 5, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

function Section({ title, children }) {
  return (
    <div className="bg-app-card rounded-xl border border-border-default p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

export default function ExamplesPage() {
  const [inputVal, setInputVal] = useState('');
  const [dropdownVal, setDropdownVal] = useState('');
  const [multiVal, setMultiVal] = useState([]);
  const [searchableVal, setSearchableVal] = useState('');
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = useMemo(() => [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const val = getValue();
        const color = val === 'Active' ? 'green' : val === 'Pending' ? 'yellow' : 'gray';
        return <Badge label={val} color={color} dot />;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button className="p-2 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">UI Components</h1>
        <p className="text-sm text-text-secondary mt-1">
          All available components in this template — copy what you need
        </p>
      </div>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="primary" iconLeft={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            }>With Icon</Button>
          </div>
        </div>
      </Section>

      {/* Form Controls */}
      <Section title="Form Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Text Input"
            placeholder="Type something..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Input
            label="With Error"
            placeholder="Invalid field"
            value=""
            onChange={() => {}}
            error="This field is required"
          />
          <Dropdown
            label="Dropdown (Single)"
            options={DEMO_OPTIONS}
            value={dropdownVal}
            onChange={(e) => setDropdownVal(e.target.value)}
            placeholder="Choose one..."
          />
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Multi Select</label>
            <MultiSelect
              options={DEMO_OPTIONS}
              value={multiVal}
              onChange={setMultiVal}
              placeholder="Select multiple..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Searchable Select</label>
            <SearchableSelect
              options={DEMO_OPTIONS}
              value={searchableVal}
              onChange={setSearchableVal}
              placeholder="Search and select..."
            />
          </div>
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search bar..."
          />
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge label="Blue" color="blue" />
          <Badge label="Green" color="green" />
          <Badge label="Red" color="red" />
          <Badge label="Yellow" color="yellow" />
          <Badge label="Purple" color="purple" />
          <Badge label="Gray" color="gray" />
          <Badge label="Custom Hex" color="#e91e63" />
          <Badge label="Outline" color="blue" variant="outline" />
          <Badge label="With Dot" color="green" dot />
          <Badge label="Connected" color="connected" dot />
          <Badge label="Blocked" color="blocked" dot />
        </div>
      </Section>

      {/* Stat Cards */}
      <Section title="Stat Cards">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Revenue" value="$12.4K" accentColor="green" percentage="+8%" trend="positive" />
          <StatCard title="Users" value="1,284" accentColor="blue" percentage="+3%" trend="positive" />
          <StatCard title="Bounce Rate" value="24%" accentColor="yellow" percentage="+2%" trend="negative" />
          <StatCard title="Errors" value="12" accentColor="red" percentage="-50%" trend="positive" />
        </div>
      </Section>

      {/* Health Dots */}
      <Section title="Health Dots">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <HealthDot status="good" />
            <span className="text-sm text-text-secondary">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <HealthDot status="warning" pulse />
            <span className="text-sm text-text-secondary">Warning (pulse)</span>
          </div>
          <div className="flex items-center gap-2">
            <HealthDot status="error" pulse />
            <span className="text-sm text-text-secondary">Error (pulse)</span>
          </div>
        </div>
      </Section>

      {/* Loading & Empty States */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Loading Spinner">
          <div className="flex items-center justify-center py-6">
            <LoadingSpinner text="Loading data..." />
          </div>
        </Section>
        <Section title="Empty State">
          <EmptyState
            title="No items found"
            message="Try adjusting your filters or create a new item."
            action={<Button variant="primary" size="small">Create Item</Button>}
          />
        </Section>
      </div>

      {/* Modals */}
      <Section title="Modals & Dialogs">
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Open Confirm Dialog</Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Save</Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              This is a reusable modal component. It supports different sizes, backdrop click to close,
              escape key, and custom footer buttons.
            </p>
            <Input label="Example Field" placeholder="Type here..." value="" onChange={() => {}} />
          </div>
        </Modal>

        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
          title="Delete Item?"
          message="This action cannot be undone. Are you sure you want to proceed?"
          confirmLabel="Delete"
          confirmVariant="danger"
        />
      </Section>

      {/* Data Table */}
      <Section title="Data Table">
        <DataTable
          columns={columns}
          data={DEMO_TABLE_DATA}
          showPagination={true}
          defaultPageSize={25}
        />
      </Section>
    </div>
  );
}
