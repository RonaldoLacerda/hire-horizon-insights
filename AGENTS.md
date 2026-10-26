<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Dashboard architecture
- Keep prototype datasets in `src/components/dash/data.ts` and approval examples in `approvals.ts`; shared sources keep related indicators consistent.
- Compose the four dashboard tabs with shared chart and KPI primitives; client-priority distributions precede legacy operational analysis.
- Keep approval visibility in the pure `approvalsForTab` helper and cover empty and tab-specific behavior with unit tests.
- This dashboard is a frontend prototype with explicitly labeled fictional data, not a live reporting or approval service.
- Apply dashboard light/dark modes through semantic CSS variables and a document-level class toggled after hydration; keep the system header's brand colors independent of the data palette.
- Prebundle React, its renderer, and dashboard hook-based Radix controls together in Vite; late dependency optimization can create incompatible React instances during preview updates.
