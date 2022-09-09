interface iKeplarPlanets {
    kepid: string;
    koi_disposition: string;
    koi_insol: string;
    koi_prad: string;
    kepler_name: string;
}
export declare function loadPlanetsData(): Promise<unknown>;
export declare function getAllPlanets(): Array<iKeplarPlanets>;
export {};
