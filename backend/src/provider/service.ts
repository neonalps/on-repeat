import { validateNotNull } from "@src/util/validation";
import mapper from "./mapper";

export const getPlayedTrackById = async (id: number): Promise<PlayedTrackDto | null> => {
    validateNotNull(id, "id");

    const playedTrack = await mapper.getById(id);
    if (!playedTrack) {
        return null;
    }

    return new PlayedTrackDtoBuilder()
        .setId(playedTrack.getId())
        .setAccountId(playedTrack.getAccountId())
        .setTrackId(playedTrack.getTrackId())
        .setMusicProviderId(playedTrack.getMusicProviderId())
        .setPlayedAt(playedTrack.getPlayedAt())
        .setCreatedAt(playedTrack.getCreatedAt())
        .build();
};

export const createPlayedTrack = async (dto: CreatePlayedTrackDto): Promise<PlayedTrackDto | null> => {
    validateNotNull(dto, "createPlayedTrackDto");
    validateNotNull(dto.getTrackId(), "createPlayedTrackDto.trackId");
    validateNotNull(dto.getAccountId(), "createPlayedTrackDto.accountId");
    validateNotNull(dto.getMusicProviderId(), "createPlayedTrackDto.musicProviderId");
    validateNotNull(dto.getPlayedAt(), "createPlayedTrackDto.playedAt");

    const createdPlayedTrackId = await mapper.create(dto);
    return getPlayedTrackById(createdPlayedTrackId);
};