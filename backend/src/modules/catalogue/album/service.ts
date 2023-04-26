import { setEquals } from "@src/util/collection";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { AlbumMapper } from "./mapper";
import { requireNonNull } from "@src/util/common";

const areUpdateablePropertiesEqual = (first: AlbumDao, second: AlbumDao): boolean => {
    validateNotNull(first, "firstAlbum");
    validateNotNull(second, "secondAlbum");

    return first.getName() === second.getName()
        && setEquals(first.getArtistIds(), second.getArtistIds())
        && first.getType() === second.getType()
        && first.getAlbumType() === second.getAlbumType()
        && first.getAlbumGroup() === second.getAlbumGroup()
        && first.getReleaseDate() === second.getReleaseDate()
        && first.getReleaseDatePrecision() === second.getReleaseDatePrecision()
        && setEquals(first.getImages(), second.getImages());
};

export class AlbumService {

    private readonly mapper: AlbumMapper;

    constructor(mapper: AlbumMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async create(dto: CreateAlbumDto): Promise<AlbumDao | null> {
        validateNotNull(dto, "createAlbumDto");
        validateNotBlank(dto.getName(), "createAlbumDto.name");
        validateNotNull(dto.getArtistIds(), "createAlbumDto.artistIds");
        validateNotBlank(dto.getType(), "createAlbumDto.type");
        validateNotBlank(dto.getAlbumType(), "createAlbumDto.albumType");
        validateNotBlank(dto.getAlbumGroup(), "createAlbumDto.albumGroup");
        validateNotNull(dto.getImages(), "createAlbumDto.images");
    
        const createdAlbumId = await this.mapper.create(dto);
    
        for (const artistId of dto.getArtistIds().values()) {
            await this.mapper.createAlbumArtistRelation(createdAlbumId, artistId);
        }
    
        for (const albumImage of dto.getImages().values())  {
            const albumImageDto = new CreateAlbumImageDtoBuilder()
                .setHeight(albumImage.getHeight())
                .setWidth(albumImage.getWidth())
                .setUrl(albumImage.getUrl())
                .build();
    
            await this.mapper.createAlbumImageRelation(createdAlbumId, albumImageDto);
        }
    
        return this.getById(createdAlbumId);
    };
    
    public async getById(id: number): Promise<AlbumDao | null> {
        validateNotNull(id, "id");
    
        const album = await this.mapper.getById(id);
        if (!album) {
            return null;
        }
    
        return album;
    };
}