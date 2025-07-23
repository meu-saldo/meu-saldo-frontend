export default function TableTemplate({ column, data, onRowClick, emptyStateMessage = "Nenhum resultado encontrado." }) {

    const handleRowClick = (row) => { if (onRowClick) onRowClick(row); };
    const handleKeyDown = (event, row) => { if (event.key === 'Enter' && onRowClick) onRowClick(row); };

    const gridTemplateColumns = 'grid-cols-[2fr_1fr_1.5fr]';

    return (
        <div>
            <div className={`hidden md:grid ${gridTemplateColumns} gap-4 px-4 py-3 border-b bg-gray-50/80 sticky top-0
            z-10`}>
                {column.map((col) => (
                    <div key={col.accessor} className={`text-${col.align || 'left'} text-xs font-semibold text-gray-500 uppercase tracking-wider`}>
                        {col.header}
                    </div>
                ))}
            </div>

            <div>
                {data && data.length > 0 ? (
                    data.map((row) => (
                        <div
                            key={row.id}
                            onClick={() => handleRowClick(row)}
                            onKeyDown={(e) => handleKeyDown(e, row)}
                            className={`
                                flex flex-col border-b last:border-b-0 gap-4 items-center px-4 py-3
                                md:grid ${gridTemplateColumns} 
                                ${onRowClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}
                            `}
                            tabIndex={onRowClick ? 0 : -1}
                        >
                            
                            {column.map((col) => {
                                const cellContent = col.cell
                                    ? col.cell(row)
                                    : col.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

                                return (
                                    <div key={col.accessor} className={`py-1 md:py-0 text-${col.align || 'left'}`}>
                                        <span className="
                                        md:hidden text-xs font-bold text-gray-500 mr-2
                                    ">
                                        {col.header}:
                                    </span>
                                        {cellContent}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-48 text-center text-muted-foreground p-8">
                        {emptyStateMessage}
                    </div>
                )}
            </div>
        </div>
    );
}