"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { apexDirectives, apexMetrics, apexRoles } from '@/data/apexSandbox';

function statusStyle(status: 'green' | 'amber' | 'red') {
  if (status === 'green') return { label: 'GREEN', chip: 'bg-[#113D35] text-[#8EFFE0]' };
  if (status === 'amber') return { label: 'AMBER', chip: 'bg-[#3D3314] text-[#FFE8A1]' };
  return { label: 'RED', chip: 'bg-[#3E1B1B] text-[#FFC0C0]' };
}

function progressClass(progress: number) {
  if (progress >= 90) return 'w-full';
  if (progress >= 75) return 'w-[75%]';
  if (progress >= 60) return 'w-[60%]';
  if (progress >= 45) return 'w-[45%]';
  if (progress >= 30) return 'w-[30%]';
  return 'w-[15%]';
}

interface ApexNexusSandboxProps {
  compact?: boolean;
}

export function ApexNexusSandbox({ compact = false }: ApexNexusSandboxProps) {
  const [roleId, setRoleId] = useState('secretariat');

  const activeRole = useMemo(
    () => apexRoles.find((role) => role.id === roleId) ?? apexRoles[0],
    [roleId]
  );

  const directives = useMemo(() => {
    if (roleId === 'mda') return apexDirectives.filter((directive) => directive.ministry === 'MoWT');
    if (roleId === 'oversight') return apexDirectives.filter((directive) => directive.status !== 'green');
    return apexDirectives;
  }, [roleId]);

  return (
    <section className="relative overflow-hidden border border-terrain-mid/30 bg-basalt text-canvas shadow-[0_24px_80px_rgba(28,24,21,0.5)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(8,255,170,0.16),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(8,120,110,0.2),transparent_46%)]" />

      <div className="relative border-b border-[rgba(143,255,229,0.18)] px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/apex-nexus-logo.png"
              alt="APEX NEXUS"
              width={42}
              height={42}
              className="h-10 w-10 rounded-md border border-[rgba(143,255,229,0.28)] object-cover"
            />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#88BDB3]">Sandbox Simulation</p>
              <h2 className="font-display text-lg font-semibold text-canvas">APEX NEXUS Interactive Console</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[rgba(143,255,229,0.25)] bg-[rgba(8,255,170,0.08)] px-3 py-1.5">
            <span className="signal-dot signal-dot-live h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A8FFE7]">FY 2025/26 Q4</span>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-[rgba(143,255,229,0.14)] p-4 lg:border-b-0 lg:border-r lg:border-[rgba(143,255,229,0.14)]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8CC4B8]">Role Access</p>
          <div className="grid gap-2">
            {apexRoles.map((role) => {
              const active = role.id === activeRole.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRoleId(role.id)}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    active
                      ? 'border-[rgba(143,255,229,0.35)] bg-[rgba(8,255,170,0.16)]'
                      : 'border-[rgba(143,255,229,0.14)] bg-[rgba(9,18,21,0.82)] hover:border-[rgba(143,255,229,0.3)]'
                  }`}
                >
                  <p className="text-xs font-semibold text-[#E6FCF6]">{role.label}</p>
                  <p className="mt-1 text-[11px] text-[#84A9A1]">{role.office}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="p-4 md:p-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {apexMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-[rgba(143,255,229,0.15)] bg-[rgba(8,18,21,0.8)] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#82A89F]">{metric.label}</p>
                <p className="mt-1 text-xl font-semibold text-[#DFFFF5]">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[rgba(143,255,229,0.16)] bg-[rgba(7,15,18,0.9)] p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8BBEB3]">Active View</p>
                <h3 className="font-display text-lg font-semibold text-canvas">{activeRole.label} Workspace</h3>
              </div>
              {!compact ? (
                <Link
                  href="/work/apex-nexus"
                  className="rounded-full border border-[rgba(143,255,229,0.24)] px-3 py-1.5 text-xs text-[#A7FBE3] transition hover:bg-[rgba(8,255,170,0.12)]"
                >
                  Back to Case File
                </Link>
              ) : null}
            </div>

            <div className="grid gap-3">
              {directives.map((directive) => {
                const style = statusStyle(directive.status);
                return (
                  <article
                    key={directive.id}
                    className="rounded-xl border border-[rgba(143,255,229,0.15)] bg-[linear-gradient(145deg,rgba(11,27,31,0.95),rgba(10,17,20,0.95))] p-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#89B9AF]">{directive.id}</p>
                        <h4 className="mt-0.5 text-sm font-semibold text-[#E2FBF4]">{directive.title}</h4>
                        <p className="mt-0.5 text-xs text-[#7FA29A]">{directive.pillar} • {directive.ministry}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.14em] ${style.chip}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(123,175,162,0.24)]">
                      <div
                        className={`h-full bg-[linear-gradient(90deg,#7C8B57,#E8A33D)] ${progressClass(directive.progress)}`}
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#9DC5BC]">{directive.note}</p>
                  </article>
                );
              })}
            </div>
          </div>

          {compact ? (
            <div className="mt-4 flex justify-end">
              <Link
                href="/sandbox/apex-nexus"
                className="rounded-full border border-[rgba(143,255,229,0.25)] px-4 py-2 text-xs font-medium text-[#B8FFEB] transition hover:bg-[rgba(8,255,170,0.14)]"
              >
                Open Fullscreen Sandbox
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
