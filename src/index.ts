import generateNoise, { DEFAULT_PERLIN_SIZE } from './perlin';
import { Biome, BiomeLayer, MapParameters } from './types';

export default class GenBiome {
  /**
   * Map width.
   */
  readonly width: number;

  /**
   * Map height.
   */
  readonly height: number;

  /**
   * Layers list.
   */
  private layers: BiomeLayer[];

  /**
   * Common map data.
   */
  private data: Biome[][] = [];

  /**
   * Perlin seed.
   */
  private seed: number[] = [];

  constructor(parameters: MapParameters) {
    const {
      width, height, seed,
      layers = [],
    } = parameters;

    this.width = width;
    this.height = height;
    this.layers = layers;
    this.seed = seed || GenBiome.generateRandomSeed();
  }

  /**
   * Get random generation seed.
   */
  static generateRandomSeed(): number[] {
    const seed = [];
    for (let i = 0; i < DEFAULT_PERLIN_SIZE + 1; i++) {
      seed.push(Math.random());
    }

    return seed;
  }

  /**
   * Add new layer to map with custom generation parameters.
   */
  public addLayer(layer: BiomeLayer) {
    this.layers.push(layer);
  }

  /**
   * Remove all layers from map.
   */
  public clearLayers() {
    this.layers = [];
  }

  /**
   * Generate map for each layer and merging them.
   */
  public generate() {
    this.data = [];
    for (const layer of this.layers) {
      const layerData = this.generateLayer(layer);
      for (let y = 0; y < layerData.length; y++) {
        for (let x = 0; x < layerData[y].length; x++) {
          if (layerData[y][x] !== null) {
            if (!this.data[y]) {
              this.data[y] = [];
            }
            this.data[y][x] = layerData[y][x];
          }
        }
      }
    }
  }

  /**
   * Get common map data.
   */
  public getData(): Biome[][] {
    return this.data;
  }

  /**
   * Set common map data.
   */
  public setData(data: Biome[][]) {
    if (this.data.length !== this.height || this.data[0].length !== this.width) {
      throw Error('Invalid map data size');
    }

    this.data = data;
  }

  /**
   * Convert map data to array of tiles indexes.
   */
  public getTilesMatrix(): number[][] {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }

    return this.data.map((y) => (
      y.map((x) => x.tileIndex)
    ));
  }

  /**
   * Convert map data to array of collide areas.
   */
  public getCollideMatrix(): (1 | 0)[][] {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }

    return this.data.map((y) => (
      y.map((x) => (x.collide ? 1 : 0))
    ));
  }

  /**
   * Get biom data at map position.
   */
  public getBiomeAt(x: number, y: number): Biome | null {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }
    if (this.data[y]?.[x] === undefined) {
      return null;
    }

    return this.data[y][x];
  }

  /**
   * Set new biom data at map position.
   */
  public setBiomeAt(x: number, y: number, biome: Biome) {
    if (this.data.length === 0) {
      throw Error('Map not generated. First use `generate()`');
    }
    if (this.data[y]?.[x] === undefined) {
      return;
    }

    this.data[y][x] = biome;
  }

  /**
   * Get biomes from all layers.
   */
  public getBiomes(): Biome[] {
    return this.layers.map((layer) => layer.biomes).flat();
  }

  /**
   * Get current generation seed.
   */
  public getSeed(): number[] {
    return this.seed;
  }

  /**
   * Set generation seed.
   */
  public setSeed(seed: number[]) {
    this.seed = seed;
  }

  /**
   * Generate map layer.
   */
  private generateLayer(layer: BiomeLayer): Biome[][] {
    const {
      frequencyChange = 10,
      sizeDifference = 1.1,
      bordersPuriry = 10,
    } = layer.parameters;

    const frequency = Math.max(1, Math.min(64, frequencyChange));
    const octaves = 22 - Math.max(2, Math.min(20, bordersPuriry));
    const redistribution = Math.max(0.1, Math.min(3, sizeDifference));

    const map = [];
    for (let y = 0; y < this.height; y++) {
      map[y] = [];
      for (let x = 0; x < this.width; x++) {
        let cell = generateNoise({
          seed: this.seed,
          octaves,
          x: (x / this.width) * frequency,
          y: (y / this.height) * frequency,
        });
        cell **= redistribution;
        const biome = layer.biomes.find(({ level }) => {
          const [min, max] = level;
          return (
            (min === undefined || cell >= min)
            && (max === undefined || cell < max)
          );
        });
        map[y][x] = biome || null;
      }
    }

    return map;
  }
}

export * from './types';
