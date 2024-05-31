import { IsOptional, IsString, IsUrl } from 'class-validator';
export class UpdateArticleDto {
  //readonly id: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly url?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly h1?: string;

  @IsOptional()
  @IsString()
  readonly text1?: string;

  @IsOptional()
  @IsString()
  readonly text2?: string;

  @IsOptional()
  @IsString()
  readonly text3?: string;

  @IsOptional()
  @IsString()
  readonly picture?: string;
}
