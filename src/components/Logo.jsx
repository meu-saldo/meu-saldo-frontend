export default function Logo() {
    return (
        <div className="flex items-center justify-center gap-2">
            <img className="size-12" src="/src/assets/meusaldo-icon.svg" alt="Logo do Meu Saldo" />
            <p className="text-2xl font-bold text-green-500">Meu Saldo</p>
        </div>
    )
}