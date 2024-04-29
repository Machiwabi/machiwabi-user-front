import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

export const serializeMdxContent = async (
  mdxContent: string | null
): Promise<MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
> | null> => {
  return mdxContent ? await serialize(mdxContent) : null
}
