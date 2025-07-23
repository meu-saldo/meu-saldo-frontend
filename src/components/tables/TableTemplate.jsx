import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function TableTemplate({ column, data, onRowClick, emptyStateMessage = "Nenhum resultado encontrado." }) {

    const handleRowClick = (row) => { if (onRowClick) onRowClick(row); };
    const handleKeyDown = (event, row) => { if (event.key === 'Enter' && onRowClick) onRowClick(row); };

    const gridTemplateColumns = 'md:grid-cols-[2fr_1fr_1.5fr]';

    const getCellContent = (col, rowData) => col.cell
        ? col.cell(rowData)
        : col.accessor.split('.').reduce((acc, part) => acc && acc[part], rowData);

    return (
        <div>
            <div className={`hidden md:grid ${gridTemplateColumns} gap-4 px-4 py-3 border-b border-slate-200 bg-slate-50 sticky top-0 z-10`}>
                {column.map((col) => (
                    <div key={col.accessor} className={`text-${col.align || 'left'} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                        {col.header}
                    </div>
                ))}
            </div>

            <div className="p-2 sm:p-4 bg-slate-100 md:bg-transparent md:p-0">
                <div className="space-y-4">
                    {data && data.length > 0 ? (
                        data.map((row) => (
                            <div
                                key={row.id}
                                onClick={() => handleRowClick(row)}
                                onKeyDown={(e) => handleKeyDown(e, row)}
                                className={`
                                    md:grid ${gridTemplateColumns} md:border-b md:border-slate-200 md:items-center
                                    ${onRowClick ? "cursor-pointer md:hover:bg-slate-50/80" : ""}
                                `}
                                tabIndex={onRowClick ? 0 : -1}
                            >

                                <div className={`
                                    md:hidden bg-white rounded-xl shadow p-5 
                                    ${onRowClick ? "transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2" : ""}
                                `}>
                                    {(() => {
                                        const primaryColumn = column[0];
                                        const secondaryColumns = column.slice(1);

                                        return (
                                            <div className="flex flex-col h-full space-y-4">
                                                {primaryColumn && (
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-bold text-base text-slate-800 break-words">
                                                            {getCellContent(primaryColumn, row)}
                                                        </span>
                                                        {onRowClick && (
                                                            <ChevronRightIcon className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                                                        )}
                                                    </div>
                                                )}

                                                <hr className="border-slate-200/80" />

                                                <div className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                                                    {secondaryColumns.map(col => (
                                                        <div key={col.accessor}>
                                                            <p className="text-xs text-slate-500 uppercase font-medium">{col.header}</p>
                                                            <p className="text-slate-700 mt-1 break-words">
                                                                {getCellContent(col, row)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>

                                <div className="hidden md:contents">
                                    {column.map((col) => (
                                        <div key={col.accessor} className={`text-${col.align || 'left'} text-sm text-slate-700 px-4 py-3`}>
                                            {getCellContent(col, row)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        // AQUI ESTÁ A CORREÇÃO
                        // O `empty state` deve estar dentro dos parênteses do ternário
                        <div className="flex items-center justify-center h-48 text-center text-slate-500 p-8">
                            {emptyStateMessage}
                        </div>
                    )} {/* A chave e o parêntese aqui fecham o bloco {data && ...} */}
                </div>
            </div>
        </div>
    );
}