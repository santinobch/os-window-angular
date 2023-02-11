export interface osTheme {
    theme: string,
    variants: string[],
    palette: string[]
}

export const theme_list: osTheme[] = [
    {
        theme: "arc",
        variants: ["light", "dark"],
        palette: ["red", "orange", "yellow", "lime", "green", "aqua", "blue", "purple", "magenta"]
    },
    {
        theme: "win98",
        variants: ["classic", "vaporwave"],
        palette: ["red", "orange", "yellow", "lime", "green", "aqua", "blue", "purple", "magenta"]
    }
]