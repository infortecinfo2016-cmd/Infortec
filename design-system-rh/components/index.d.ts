import type * as React from 'react';

export type IconName = 'home' | 'users' | 'user-plus' | 'clock' | 'calendar' | 'wallet' | 'gift' | 'star' | 'chart' | 'file' | 'check' | 'x' | 'plus' | 'search' | 'filter' | 'download' | 'bell' | 'chevron-right' | 'chevron-down' | 'arrow-up' | 'arrow-down' | 'info' | 'alert' | 'check-circle' | 'x-circle' | 'logout';
export type Status = 'ativo' | 'experiencia' | 'admissao' | 'ferias' | 'licenca' | 'afastado' | 'desligado' | 'pendente' | 'analise' | 'aprovado' | 'recusado' | 'atraso' | 'falta' | 'regular';
export type Tone = 'success' | 'warning' | 'danger' | 'leave' | 'people' | 'brand' | 'neutral';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg'; icon?: IconName; iconRight?: IconName; loading?: boolean; block?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface IconProps { name: IconName; size?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; hint?: string; error?: string; icon?: IconName; suffix?: React.ReactNode; mono?: boolean }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { label?: string; hint?: string; error?: string; placeholder?: string; options: Array<string | { value: string; label: string }> }
export declare function Select(props: SelectProps): React.ReactElement;
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { label: React.ReactNode; description?: React.ReactNode }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface SwitchProps { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (next: boolean) => void; disabled?: boolean; className?: string }
export declare function Switch(props: SwitchProps): React.ReactElement;
export interface StatusBadgeProps { status?: Status; tone?: Tone; size?: 'sm' | 'md'; children?: React.ReactNode; className?: string }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;
export interface AvatarProps { name: string; src?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; tone?: 'brand' | 'people' | 'leave'; status?: 'online' | 'ferias' | 'offline'; className?: string }
export declare function Avatar(props: AvatarProps): React.ReactElement;
export interface AlertProps { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode; onClose?: () => void; className?: string }
export declare function Alert(props: AlertProps): React.ReactElement;
export interface TabsProps { items: Array<{ id: string; label: React.ReactNode; count?: number }>; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
export interface StatCardProps { label: string; value: React.ReactNode; unit?: string; icon?: IconName; delta?: string; deltaLabel?: string; trend?: 'up' | 'down' | 'flat'; goodWhen?: 'up' | 'down'; className?: string }
export declare function StatCard(props: StatCardProps): React.ReactElement;
export interface EmployeeCardProps { name: string; role?: string; status?: Status; department?: string; registration?: string; admission?: string; manager?: string; photo?: string; onClick?: () => void; className?: string }
export declare function EmployeeCard(props: EmployeeCardProps): React.ReactElement;
export interface DataTableColumn<R> { key: string; label: React.ReactNode; align?: 'right' | 'center'; mono?: boolean; width?: number | string; render?: (row: R) => React.ReactNode }
export interface DataTableProps<R = Record<string, unknown>> { columns: DataTableColumn<R>[]; rows: R[]; rowKey?: string; onRowClick?: (row: R) => void; dense?: boolean; caption?: string; empty?: React.ReactNode; className?: string }
export declare function DataTable<R>(props: DataTableProps<R>): React.ReactElement;
export interface RequestCardProps { kind?: 'Férias' | 'Banco de horas' | 'Atestado' | 'Reembolso' | string; status?: Status; name: string; role?: string; period?: string; amount?: string; amountLabel?: string; note?: string; onApprove?: () => void; onReject?: () => void; submitted?: string; className?: string }
export declare function RequestCard(props: RequestCardProps): React.ReactElement;
export interface TimesheetDay { date: string; punches?: string[]; total?: string; balance?: string; flag?: 'falta' | 'ferias' | 'feriado' | 'folga' }
export interface TimesheetProps { days: TimesheetDay[]; slots?: number; caption?: string; className?: string }
export declare function Timesheet(props: TimesheetProps): React.ReactElement;
export interface SideNavItem { id: string; label: string; icon?: IconName; badge?: number; href?: string }
export interface SideNavProps { logoSrc?: string; groups: Array<{ title?: string; items: SideNavItem[] }>; active?: string; defaultActive?: string; onSelect?: (id: string) => void; user?: { name: string; role?: string }; className?: string }
export declare function SideNav(props: SideNavProps): React.ReactElement;

declare global { interface Window { InfortecRH: { Button: typeof Button; Icon: typeof Icon; TextField: typeof TextField; Select: typeof Select; Checkbox: typeof Checkbox; Switch: typeof Switch; StatusBadge: typeof StatusBadge; Avatar: typeof Avatar; Alert: typeof Alert; Tabs: typeof Tabs; StatCard: typeof StatCard; EmployeeCard: typeof EmployeeCard; DataTable: typeof DataTable; RequestCard: typeof RequestCard; Timesheet: typeof Timesheet; SideNav: typeof SideNav } } }
