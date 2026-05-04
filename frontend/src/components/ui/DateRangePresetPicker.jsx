import { useState, useRef, useEffect, useMemo } from 'react';

/* ══════════════════════════════════════════════
   Preset definitions
   ══════════════════════════════════════════════ */
function startOfWeek(d) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday = start
  const r = new Date(d);
  r.setDate(r.getDate() + diff);
  return r;
}

function fmt(d) {
  return d.toISOString().split('T')[0];
}

function getPresetRange(key) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (key) {
    case 'today':
      return [fmt(today), fmt(today)];
    case 'yesterday': {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      return [fmt(y), fmt(y)];
    }
    case 'current_week': {
      return [fmt(startOfWeek(today)), fmt(today)];
    }
    case 'last_week': {
      const s = startOfWeek(today);
      s.setDate(s.getDate() - 7);
      const e = new Date(s);
      e.setDate(e.getDate() + 6);
      return [fmt(s), fmt(e)];
    }
    case 'current_month':
      return [fmt(new Date(today.getFullYear(), today.getMonth(), 1)), fmt(today)];
    case 'last_month': {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const e = new Date(today.getFullYear(), today.getMonth(), 0);
      return [fmt(s), fmt(e)];
    }
    case 'current_year':
      return [fmt(new Date(today.getFullYear(), 0, 1)), fmt(today)];
    case 'last_year': {
      const y = today.getFullYear() - 1;
      return [fmt(new Date(y, 0, 1)), fmt(new Date(y, 11, 31))];
    }
    case '7d': {
      const s = new Date(today);
      s.setDate(s.getDate() - 6);
      return [fmt(s), fmt(today)];
    }
    case '30d': {
      const s = new Date(today);
      s.setDate(s.getDate() - 29);
      return [fmt(s), fmt(today)];
    }
    case '90d': {
      const s = new Date(today);
      s.setDate(s.getDate() - 89);
      return [fmt(s), fmt(today)];
    }
    case '6m': {
      const s = new Date(today);
      s.setMonth(s.getMonth() - 6);
      return [fmt(s), fmt(today)];
    }
    default:
      return [null, null];
  }
}

const PRESETS = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'current_week', label: 'Current Week' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'current_month', label: 'Current Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'current_year', label: 'Current Year' },
  { key: 'last_year', label: 'Last Year' },
  { key: 'custom', label: 'Custom Range' },
];

const DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ══════════════════════════════════════════════
   Calendar month grid
   ══════════════════════════════════════════════ */
function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  let startOffset = firstDay.getDay() - 1; // Monday-based
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  // Previous month fill
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, current: false, date: fmt(new Date(year, month - 1, prevMonthDays - i)) });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, current: true, date: fmt(new Date(year, month, d)) });
  }

  // Next month fill (6 rows × 7 = 42)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, current: false, date: fmt(new Date(year, month + 1, d)) });
  }

  return days;
}

function CalendarMonth({ year, month, from, to, hovered, onDayClick, onDayHover, onPrev, onNext }) {
  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const todayStr = fmt(new Date());

  const isInRange = (dateStr) => {
    if (!from) return false;
    const end = to || hovered;
    if (!end) return dateStr === from;
    const [a, b] = from <= end ? [from, end] : [end, from];
    return dateStr >= a && dateStr <= b;
  };

  const isStart = (dateStr) => {
    if (!from) return false;
    const end = to || hovered;
    if (!end) return dateStr === from;
    return dateStr === (from <= end ? from : end);
  };

  const isEnd = (dateStr) => {
    if (!from) return false;
    const end = to || hovered;
    if (!end) return false;
    return dateStr === (from <= end ? end : from);
  };

  return (
    <div className="w-[280px]">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3 px-1">
        {onPrev ? (
          <button onClick={onPrev} className="p-1 text-text-muted hover:text-text-primary rounded transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : <div className="w-6" />}
        <span className="text-sm font-semibold text-text-primary">
          {MONTH_NAMES[month]} <span className="text-text-secondary font-normal">{year}</span>
        </span>
        {onNext ? (
          <button onClick={onNext} className="p-1 text-text-muted hover:text-text-primary rounded transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ) : <div className="w-6" />}
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-text-muted py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const inRange = isInRange(d.date);
          const start = isStart(d.date);
          const end = isEnd(d.date);
          const isToday = d.date === todayStr;

          return (
            <button
              key={i}
              onClick={() => d.current && onDayClick(d.date)}
              onMouseEnter={() => d.current && onDayHover(d.date)}
              className={[
                'relative h-8 text-xs transition-colors',
                !d.current ? 'text-text-muted/40 cursor-default' : 'cursor-pointer',
                d.current && !inRange ? 'hover:bg-accent-primary/10 text-text-secondary' : '',
                inRange && !start && !end ? 'bg-accent-primary/15 text-text-primary' : '',
                start || end ? 'bg-accent-primary text-white font-medium' : '',
                start ? 'rounded-l-full' : '',
                end ? 'rounded-r-full' : '',
                start && end ? 'rounded-full' : '',
                isToday && !start && !end ? 'font-bold text-accent-primary' : '',
              ].join(' ')}
            >
              {d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main DateRangePresetPicker
   ══════════════════════════════════════════════ */
export default function DateRangePresetPicker({ from, to, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('custom');
  const [tempFrom, setTempFrom] = useState(from || '');
  const [tempTo, setTempTo] = useState(to || '');
  const [hovered, setHovered] = useState(null);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // Calendar view: left shows previous month, right shows current
  const today = new Date();
  const [rightYear, setRightYear] = useState(today.getFullYear());
  const [rightMonth, setRightMonth] = useState(today.getMonth());

  const leftYear = rightMonth === 0 ? rightYear - 1 : rightYear;
  const leftMonth = rightMonth === 0 ? 11 : rightMonth - 1;

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(e.target))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync temp values when props change
  useEffect(() => {
    if (!isOpen) {
      setTempFrom(from || '');
      setTempTo(to || '');
    }
  }, [from, to, isOpen]);

  // Position dropdown using fixed positioning to escape overflow:hidden
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropW = 760;
      let left = rect.right - dropW;
      if (left < 8) left = 8;
      setDropdownPos({ top: rect.bottom + 8, left });
    }
  }, [isOpen]);

  // Detect active preset from current range
  useEffect(() => {
    if (!from || !to) return;
    for (const p of PRESETS) {
      if (p.key === 'custom') continue;
      const [pf, pt] = getPresetRange(p.key);
      if (pf === from && pt === to) {
        setActivePreset(p.key);
        return;
      }
    }
    setActivePreset('custom');
  }, [from, to]);

  const navigateLeft = () => {
    if (rightMonth === 0) {
      setRightYear((y) => y - 1);
      setRightMonth(11);
    } else {
      setRightMonth((m) => m - 1);
    }
  };

  const navigateRight = () => {
    if (rightMonth === 11) {
      setRightYear((y) => y + 1);
      setRightMonth(0);
    } else {
      setRightMonth((m) => m + 1);
    }
  };

  const handlePresetClick = (key) => {
    setActivePreset(key);
    if (key === 'custom') {
      // Just switch to custom mode, keep dropdown open for calendar selection
      return;
    }
    // Auto-apply preset immediately
    const [f, t] = getPresetRange(key);
    setTempFrom(f);
    setTempTo(t);
    setSelectingEnd(false);
    onChange({ from: f, to: t, preset: key });
    setIsOpen(false);
  };

  const handleDayClick = (dateStr) => {
    if (!selectingEnd || !tempFrom) {
      // First click: set start
      setTempFrom(dateStr);
      setTempTo('');
      setSelectingEnd(true);
      setActivePreset('custom');
    } else {
      // Second click: set end
      if (dateStr < tempFrom) {
        setTempTo(tempFrom);
        setTempFrom(dateStr);
      } else {
        setTempTo(dateStr);
      }
      setSelectingEnd(false);
      setActivePreset('custom');
    }
  };

  const handleApply = () => {
    if (tempFrom && tempTo) {
      onChange({ from: tempFrom, to: tempTo, preset: activePreset });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempFrom(from || '');
    setTempTo(to || '');
    setIsOpen(false);
  };

  // Display text
  const displayText = useMemo(() => {
    if (!from || !to) return 'Select date range';
    const preset = PRESETS.find((p) => p.key === activePreset);
    if (preset && activePreset !== 'custom') return preset.label;
    return `${from} to ${to}`;
  }, [from, to, activePreset]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((o) => !o)}
        className={[
          'flex items-center gap-2 px-3 py-[7px] text-xs rounded-lg border transition-colors',
          'bg-app-bg text-text-primary',
          isOpen ? 'border-accent-primary ring-2 ring-accent-primary/20' : 'border-border-default hover:border-border-hover',
        ].join(' ')}
      >
        <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <span className="whitespace-nowrap">{displayText}</span>
        <svg className={`w-3.5 h-3.5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel — fixed position to escape overflow:hidden parents */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-app-card border border-border-default rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <div className="flex">
            {/* ── Left sidebar: Presets ── */}
            <div className="w-[150px] border-r border-border-default py-2 bg-app-elevated/50">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => handlePresetClick(p.key)}
                  className={[
                    'w-full text-left px-4 py-2 text-xs transition-colors',
                    activePreset === p.key
                      ? 'bg-accent-primary text-white font-medium'
                      : 'text-text-secondary hover:bg-app-elevated hover:text-text-primary',
                  ].join(' ')}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* ── Right side: Calendars (always visible) ── */}
            <div className="p-4">
              <div className="flex gap-6">
                <CalendarMonth
                  year={leftYear}
                  month={leftMonth}
                  from={tempFrom}
                  to={tempTo}
                  hovered={selectingEnd ? hovered : null}
                  onDayClick={handleDayClick}
                  onDayHover={setHovered}
                  onPrev={navigateLeft}
                  onNext={null}
                />
                <CalendarMonth
                  year={rightYear}
                  month={rightMonth}
                  from={tempFrom}
                  to={tempTo}
                  hovered={selectingEnd ? hovered : null}
                  onDayClick={handleDayClick}
                  onDayHover={setHovered}
                  onPrev={null}
                  onNext={navigateRight}
                />
              </div>

              {/* Date inputs + actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-default">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempFrom}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className="w-[110px] px-2.5 py-1.5 text-xs bg-app-bg border border-border-default rounded-md text-text-primary placeholder:text-text-muted text-center"
                  />
                  <span className="text-text-muted text-xs">to</span>
                  <input
                    type="text"
                    value={tempTo}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className="w-[110px] px-2.5 py-1.5 text-xs bg-app-bg border border-border-default rounded-md text-text-primary placeholder:text-text-muted text-center"
                  />
                </div>

                {tempFrom && tempTo && (
                  <span className="text-[11px] text-text-muted px-2">
                    {tempFrom} to {tempTo}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 text-xs text-text-secondary border border-border-default rounded-lg hover:bg-app-elevated transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={!tempFrom || !tempTo}
                    className="px-4 py-1.5 text-xs font-medium bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
