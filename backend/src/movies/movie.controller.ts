import { Controller, Post, Delete, Body, Param, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addMovie(@Body() movie: Movie) {
    return this.movieService.addMovie(movie);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMovie(@Param('id') id: string) {
    await this.movieService.removeMovie(id);
  }

  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }
}