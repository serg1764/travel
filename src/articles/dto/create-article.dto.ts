import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateArticleDto {
  readonly title?: string;
  readonly url?: string;
  readonly description?: string;
  readonly h1?: string;
  readonly text1?: string;
  readonly text2?: string;
  readonly text3?: string;
  @IsNotEmpty()
  @IsString()
  readonly text4: string;

  @IsOptional()
  @IsString()
  readonly picture?: string;
}
