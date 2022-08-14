import { TwoPointModel } from "./TwoPoint.model";
import { ZIndexModel } from "./ZIndex.model";

export interface PositionModel {
    resize: TwoPointModel,
    current: TwoPointModel,
    next: TwoPointModel
    zIndex: ZIndexModel
}