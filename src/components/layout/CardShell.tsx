/* ---------- Shared UI: Card wrapper ---------- */
interface CardShellProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
function CardShell({ title, subtitle, children, footer }: CardShellProps) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-gray-300 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-10 text-center border-b border-gray-100">
                    <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
                    {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
                </div>

                <div className="p-8">{children}</div>

                {footer && <div className="p-6 border-t border-gray-100 text-sm text-gray-500">{footer}</div>}
            </div>
        </div>
    );
}

export default CardShell