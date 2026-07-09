import { prisma } from "@repo/db";

type UserObj = {
  id: string;
  username: string;
  password: string;
};

export default async function Home() {
  const data = await prisma.user.findMany();

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoGroup}>
            <div style={styles.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h1 style={styles.logoTitle}>UserVault</h1>
              <p style={styles.logoSub}>Management Dashboard</p>
            </div>
          </div>
          <div style={styles.headerBadge}>
            <span style={styles.dot} />
            {data.length} {data.length === 1 ? "user" : "users"} registered
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={styles.main}>
        {/* Hero Stats */}
        <section style={styles.statsGrid}>
          <StatCard label="Total Users" value={data.length} color="#8b5cf6" icon="👤" />
          <StatCard label="Active Sessions" value={Math.floor(data.length * 0.6)} color="#3b82f6" icon="⚡" />
          <StatCard label="Last Sync" value="Just now" color="#06b6d4" icon="🔄" />
        </section>

        {/* Users Table */}
        <section style={styles.tableSection}>
          <div style={styles.tableTitleRow}>
            <h2 style={styles.tableTitle}>All Users</h2>
            <span style={styles.tableCount}>{data.length} total</span>
          </div>

          {data.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, width: "60px" }}>#</th>
                    <th style={styles.th}>Username</th>
                    <th style={{ ...styles.th, textAlign: "right" as const }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => (
                    <UserRow key={user.id ?? index} user={user} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          UserVault · Built with{" "}
          <span style={styles.footerAccent}>Next.js</span> &{" "}
          <span style={styles.footerAccent}>Prisma</span>
        </p>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function StatCard({ label, value, color, icon }: { label: string; value: number | string; color: string; icon: string }) {
  return (
    <div style={{ ...styles.statCard, ["--card-accent" as string]: color }}>
      <div style={{ ...styles.statIcon, background: `${color}22`, color }}>
        {icon}
      </div>
      <div>
        <p style={styles.statLabel}>{label}</p>
        <p style={{ ...styles.statValue, color }}>{value}</p>
      </div>
    </div>
  );
}

function UserRow({ user, index }: { user: UserObj; index: number }) {
  const avatarColors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
  const color = avatarColors[index % avatarColors.length];
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <tr style={styles.tr} className="user-row">
      <td style={styles.tdIndex}>
        <span style={styles.indexBadge}>{index + 1}</span>
      </td>
      <td style={styles.td}>
        <div style={styles.userInfo}>
          <div style={{ ...styles.avatar, background: `${color}22`, color, borderColor: `${color}44` }}>
            {initial}
          </div>
          <div>
            <p style={styles.username}>{user.username}</p>
            <p style={styles.userMeta}>uid:{user.id ?? "—"}</p>
          </div>
        </div>
      </td>
      <td style={{ ...styles.td, textAlign: "right" as const }}>
        <span style={styles.activeBadge}>● Active</span>
      </td>
    </tr>
  );
}

function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>🫙</div>
      <h3 style={styles.emptyTitle}>No users yet</h3>
      <p style={styles.emptyText}>Create your first user via the API to get started.</p>
      <code style={styles.emptyCode}>POST /create · {"{ username, password }"}</code>
    </div>
  );
}

/* ── Inline Styles ── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  /* Header */
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(17,17,24,0.85)",
    backdropFilter: "blur(20px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
    boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
  },
  logoTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#f1f5f9",
    letterSpacing: "-0.02em",
  },
  logoSub: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "1px",
  },
  headerBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(139,92,246,0.1)",
    border: "1px solid rgba(139,92,246,0.25)",
    fontSize: "13px",
    color: "#a78bfa",
    fontWeight: 500,
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#10b981",
    boxShadow: "0 0 6px #10b981",
    display: "inline-block",
  },

  /* Main */
  main: {
    flex: 1,
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
    padding: "48px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },

  /* Stats */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  statCard: {
    background: "#16161e",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 500,
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },

  /* Table */
  tableSection: {
    background: "#16161e",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
  },
  tableTitleRow: {
    padding: "24px 28px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  tableTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#f1f5f9",
    letterSpacing: "-0.01em",
  },
  tableCount: {
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "999px",
    background: "rgba(139,92,246,0.12)",
    color: "#a78bfa",
    fontWeight: 500,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px 20px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    background: "rgba(255,255,255,0.02)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    transition: "background 0.15s",
  },
  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: "#cbd5e1",
    verticalAlign: "middle",
  },
  tdIndex: {
    padding: "16px 20px",
    verticalAlign: "middle",
  },
  indexBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.04)",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 600,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "15px",
    border: "1px solid",
    flexShrink: 0,
  },
  username: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#f1f5f9",
    letterSpacing: "-0.01em",
  },
  userMeta: {
    fontSize: "11px",
    color: "#475569",
    marginTop: "2px",
    fontFamily: "monospace",
  },
  activeBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "999px",
    background: "rgba(16,185,129,0.1)",
    color: "#34d399",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid rgba(16,185,129,0.2)",
  },

  /* Empty state */
  emptyState: {
    padding: "80px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "52px",
    marginBottom: "8px",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#f1f5f9",
  },
  emptyText: {
    fontSize: "14px",
    color: "#64748b",
    maxWidth: "320px",
    lineHeight: 1.7,
  },
  emptyCode: {
    marginTop: "8px",
    padding: "10px 20px",
    borderRadius: "8px",
    background: "rgba(139,92,246,0.08)",
    border: "1px solid rgba(139,92,246,0.2)",
    color: "#a78bfa",
    fontSize: "13px",
    fontFamily: "monospace",
  },

  /* Footer */
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "24px 32px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "13px",
    color: "#475569",
  },
  footerAccent: {
    color: "#8b5cf6",
    fontWeight: 500,
  },
};
