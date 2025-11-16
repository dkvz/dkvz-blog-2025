export const useOrderToggle = (): { isOrderAsc: Ref<boolean>, handleToggleOrder: (asc: boolean) => void } => {
  // If true, order by date descending (default behavior)
  // Could be controlled by a URL param as well, for now it's strictly
  // JS-based and works on client only.
  // TODO: I should really replace this thing by a param in the router
  // so it's kept page to page without having to use "useState".
  const isOrderAsc = useState("isOrderAsc", () => false)

  return {
    isOrderAsc,
    handleToggleOrder: (asc) => isOrderAsc.value = asc
  }
}
