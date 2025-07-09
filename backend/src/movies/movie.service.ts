import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async addMovie(movie: Movie): Promise<Movie> {
    const existingMovie = await this.moviesRepository.findOne({ where: { id: movie.id } });
    if (existingMovie) {
      throw new ConflictException('Filme já existe na sua Library.');
    }
    return this.moviesRepository.save(movie);
  }

  async removeMovie(id: string): Promise<void> {
    const result = await this.moviesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Filme não encontrado na sua Library.');
    }
  }

  async getMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
}