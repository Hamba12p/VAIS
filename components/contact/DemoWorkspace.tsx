"use client";

import { useId, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  LayoutDashboard,
  Package,
  Plus,
  RotateCcw,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { demoPatterns, type DemoConcept } from "@/lib/demoConcept";

const initialTasks = [
  { id: 1, title: "Confirm requirements", done: false },
  { id: 2, title: "Review the first draft", done: false },
  { id: 3, title: "Prepare the handover", done: true },
];
const initialStock = [
  { name: "Packaging", quantity: 3 },
  { name: "Labels", quantity: 18 },
  { name: "Shipping cartons", quantity: 6 },
];
const initialLeads = [
  { id: 1, name: "Harbour Studio", stage: "New" },
  { id: 2, name: "Acacia Works", stage: "Proposal" },
  { id: 3, name: "Northfield Co.", stage: "Won" },
];
const slots = ["09:00", "10:30", "14:00"];
const icons = {
  operations: Workflow,
  bookings: CalendarDays,
  inventory: Package,
  pipeline: Users,
};

export function DemoWorkspace({ concept }: { concept: DemoConcept }) {
  const [tab, setTab] = useState<"workspace" | "overview">("workspace");
  const [tasks, setTasks] = useState(initialTasks);
  const [taskName, setTaskName] = useState("");
  const [stock, setStock] = useState(initialStock);
  const [bookings, setBookings] = useState<string[]>([]);
  const [leads, setLeads] = useState(initialLeads);
  const [feedback, setFeedback] = useState(
    "Try an action. This sample responds.",
  );
  const id = useId();
  const Icon = icons[concept.kind];
  const pattern = demoPatterns[concept.kind];
  const metrics =
    concept.kind === "operations"
      ? [
          { value: tasks.length, label: "Tasks" },
          { value: tasks.filter((t) => t.done).length, label: "Complete" },
          { value: tasks.filter((t) => !t.done).length, label: "To do" },
        ]
      : concept.kind === "bookings"
        ? [
            { value: slots.length, label: "Time slots" },
            { value: bookings.length, label: "Reserved" },
            { value: slots.length - bookings.length, label: "Available" },
          ]
        : concept.kind === "inventory"
          ? [
              { value: stock.length, label: "Items" },
              {
                value: stock.reduce((sum, item) => sum + item.quantity, 0),
                label: "Units",
              },
              {
                value: stock.filter((item) => item.quantity < 5).length,
                label: "Low stock",
              },
            ]
          : [
              { value: leads.length, label: "Enquiries" },
              {
                value: leads.filter((l) => l.stage !== "Won").length,
                label: "Open",
              },
              {
                value: leads.filter((l) => l.stage === "Won").length,
                label: "Won",
              },
            ];
  const reset = () => {
    setTasks(initialTasks);
    setStock(initialStock);
    setBookings([]);
    setLeads(initialLeads);
    setTaskName("");
    setFeedback("Sample reset. Try another approach.");
  };
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = taskName.trim();
    if (!title) return;
    setTasks((current) => [
      ...current,
      { id: Math.max(0, ...current.map((t) => t.id)) + 1, title, done: false },
    ]);
    setTaskName("");
    setFeedback(`Added “${title}” to the sample workspace.`);
  };
  return (
    <div
      className="demo-workspace"
      aria-label={`${pattern.title} interactive sample`}
    >
      <header className="demo-window-bar">
        <span className="demo-brand">
          <span>V</span> {concept.name || "Your workspace"}
        </span>
        <span className="demo-sample-badge">Sample data</span>
      </header>
      <div className="demo-window-content">
        <div className="demo-title">
          <span className="demo-app-icon">
            <Icon size={23} strokeWidth={1.5} />
          </span>
          <div>
            <h3>{pattern.title}</h3>
            <p>{pattern.description}</p>
          </div>
        </div>
        <div
          className="demo-view-tabs"
          role="tablist"
          aria-label="Preview views"
        >
          {(["workspace", "overview"] as const).map((view, i) => (
            <button
              key={view}
              type="button"
              role="tab"
              id={`${id}-${view}-tab`}
              aria-selected={tab === view}
              tabIndex={tab === view ? 0 : -1}
              aria-controls={`${id}-${view}-panel`}
              onClick={() => setTab(view)}
              onKeyDown={(e) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? "workspace"
                    : e.key === "End"
                      ? "overview"
                      : i === 0
                        ? "overview"
                        : "workspace";
                setTab(next);
                document.getElementById(`${id}-${next}-tab`)?.focus();
              }}
            >
              {view === "workspace" ? (
                <Workflow size={15} />
              ) : (
                <LayoutDashboard size={15} />
              )}
              {view === "workspace" ? "Workspace" : "Overview"}
            </button>
          ))}
        </div>
        <section
          role="tabpanel"
          id={`${id}-workspace-panel`}
          aria-labelledby={`${id}-workspace-tab`}
          hidden={tab !== "workspace"}
          tabIndex={0}
          className="demo-panel"
        >
          {concept.kind === "operations" && (
            <>
              <div className="demo-section-label">
                <span>Shared tasks</span>
                <span>
                  {tasks.filter((t) => t.done).length} of {tasks.length}{" "}
                  complete
                </span>
              </div>
              <div className="demo-task-list">
                {tasks.map((task) => (
                  <label
                    className={`demo-task ${task.done ? "is-done" : ""}`}
                    key={task.id}
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {
                        setTasks((current) =>
                          current.map((t) =>
                            t.id === task.id ? { ...t, done: !t.done } : t,
                          ),
                        );
                        setFeedback(
                          `${task.title} marked ${task.done ? "to do" : "complete"}.`,
                        );
                      }}
                    />
                    <span className="demo-checkbox" aria-hidden="true">
                      {task.done && <Check size={13} />}
                    </span>
                    <span>{task.title}</span>
                    <small>{task.done ? "Complete" : "To do"}</small>
                  </label>
                ))}
              </div>
              <form onSubmit={addTask} className="demo-add-row">
                <label className="sr-only" htmlFor={`${id}-task`}>
                  New sample task
                </label>
                <input
                  id={`${id}-task`}
                  value={taskName}
                  maxLength={70}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Add a task to try it…"
                />
                <button
                  type="submit"
                  aria-label="Add sample task"
                  disabled={!taskName.trim()}
                >
                  <Plus size={18} />
                </button>
              </form>
            </>
          )}
          {concept.kind === "bookings" && (
            <>
              <div className="demo-section-label">
                <span>Example availability</span>
                <span>{slots.length - bookings.length} open slots</span>
              </div>
              <div className="demo-booking-list">
                {slots.map((slot) => {
                  const reserved = bookings.includes(slot);
                  return (
                    <div
                      key={slot}
                      className={
                        reserved ? "demo-booking is-reserved" : "demo-booking"
                      }
                    >
                      <span className="demo-slot-time">{slot}</span>
                      <div>
                        <strong>
                          {reserved
                            ? "Sample appointment"
                            : "Available consultation"}
                        </strong>
                        <span>
                          {reserved
                            ? "Reserved in this preview"
                            : "30-minute appointment"}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`${reserved ? "Cancel" : "Reserve"} ${slot}`}
                        onClick={() => {
                          setBookings((current) =>
                            reserved
                              ? current.filter((s) => s !== slot)
                              : [...current, slot],
                          );
                          setFeedback(
                            `${slot} ${reserved ? "released" : "reserved"} in this sample.`,
                          );
                        }}
                      >
                        {reserved ? <X size={15} /> : <Plus size={15} />}
                        {reserved ? "Cancel" : "Reserve"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {concept.kind === "inventory" && (
            <>
              <div className="demo-section-label">
                <span>Stock on hand</span>
                <span>Low stock: fewer than 5</span>
              </div>
              <div className="demo-stock-list">
                {stock.map((item) => (
                  <div className="demo-stock-row" key={item.name}>
                    <div className="demo-stock-description">
                      <strong>{item.name}</strong>
                      <span className={item.quantity < 5 ? "stock-low" : ""}>
                        {item.quantity < 5
                          ? "Restock suggested"
                          : "Stock available"}
                      </span>
                      <span className="demo-stock-track">
                        <i
                          style={{
                            width: `${Math.min(100, (item.quantity / 20) * 100)}%`,
                          }}
                        />
                      </span>
                    </div>
                    <span className="demo-stock-quantity">
                      {item.quantity}
                      <small>units</small>
                    </span>
                    <div className="demo-stock-actions">
                      <button
                        type="button"
                        disabled={item.quantity === 0}
                        aria-label={`Use one ${item.name}`}
                        onClick={() => {
                          setStock((current) =>
                            current.map((row) =>
                              row.name === item.name
                                ? {
                                    ...row,
                                    quantity: Math.max(0, row.quantity - 1),
                                  }
                                : row,
                            ),
                          );
                          setFeedback(
                            `Used one unit of ${item.name} in the sample.`,
                          );
                        }}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label={`Add five ${item.name}`}
                        onClick={() => {
                          setStock((current) =>
                            current.map((row) =>
                              row.name === item.name
                                ? { ...row, quantity: row.quantity + 5 }
                                : row,
                            ),
                          );
                          setFeedback(
                            `Added five units of ${item.name} to the sample.`,
                          );
                        }}
                      >
                        +5
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {concept.kind === "pipeline" && (
            <>
              <div className="demo-section-label">
                <span>Client enquiries</span>
                <span>Move a client forward</span>
              </div>
              <div className="demo-leads-list">
                {leads.map((lead) => (
                  <div key={lead.id} className="demo-lead">
                    <span
                      className={`lead-avatar ${lead.stage === "Won" ? "lead-won" : ""}`}
                    >
                      {lead.stage === "Won" ? (
                        <CheckCheck size={17} />
                      ) : (
                        lead.name[0]
                      )}
                    </span>
                    <strong>{lead.name}</strong>
                    <select
                      aria-label={`Stage for ${lead.name}`}
                      value={lead.stage}
                      onChange={(e) => {
                        const stage = e.target.value;
                        setLeads((current) =>
                          current.map((l) =>
                            l.id === lead.id ? { ...l, stage } : l,
                          ),
                        );
                        setFeedback(`${lead.name} moved to ${stage}.`);
                      }}
                    >
                      {["New", "Qualified", "Proposal", "Won"].map((stage) => (
                        <option key={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="demo-inline-button"
                onClick={() => {
                  setLeads((current) => [
                    ...current,
                    {
                      id: current.length + 1,
                      name: `Example client ${current.length + 1}`,
                      stage: "New",
                    },
                  ]);
                  setFeedback("An example client was added to the pipeline.");
                }}
              >
                <Plus size={15} /> Add example client
              </button>
            </>
          )}
        </section>
        <section
          role="tabpanel"
          id={`${id}-overview-panel`}
          aria-labelledby={`${id}-overview-tab`}
          hidden={tab !== "overview"}
          tabIndex={0}
          className="demo-panel demo-overview"
        >
          <div className="demo-metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <h4>A starting point for</h4>
          <ul>
            {pattern.capabilities.map((capability) => (
              <li key={capability}>
                <Check size={14} />
                {capability}
              </li>
            ))}
          </ul>
          <p>These counts reflect your changes to the sample workspace.</p>
        </section>
        <div className="demo-feedback" role="status">
          <Check size={13} />
          <span>{feedback}</span>
        </div>
      </div>
      <footer className="demo-window-footer">
        <span>Interactive concept · Nothing is booked or sent</span>
        <button type="button" onClick={reset}>
          <RotateCcw size={13} /> Reset sample
        </button>
      </footer>
    </div>
  );
}
