import { RedirectType, redirect } from 'next/navigation'

export default function CategorySlugPage() {
  redirect('/products', RedirectType.replace)
}
