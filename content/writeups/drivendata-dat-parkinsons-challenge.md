# Two views of a brain scan: a calibrated 3D CNN and tree stack for DaT-SPECT

**Summary:** A stacked 3D CNN ensemble and gradient-boosted tree model that separates abnormal from normal DaT-SPECT scans with out-of-fold AUROC 0.9455. The CNN ensemble's probabilities are calibrated to an ECE of 0.0187, and the baseline's calibration carried over to held-out acquisition families at a log-loss cost of +0.0006 [drivendata-dat-parkinsons-challenge].

**Headline metric:** Out-of-fold AUROC 0.9455 for the final stacked model, 5-fold stratified cross-validation on 1,362 scans [drivendata-dat-parkinsons-challenge]

**Tags:** medical imaging · computer vision · binary classification · calibration

**Approved:** 2026-10-24

---

## Problem

DrivenData's DaT Parkinson's Challenge asked for one number per 3D DaT-SPECT brain scan: the probability that the scan is abnormal. Entries were scored by log loss. It measures how far the predicted probabilities were from the truth; lower is better. So the model had to be right about how sure it was, not only about which scans look abnormal.

The data was 1,362 scans from ten French hospitals, labelled by 11 nuclear medicine specialists. Scans came in 21 acquisition families with different sizes and resolutions. In the widest, the head filled about 1% of the image [drivendata-dat-parkinsons-challenge].

## Approach

<!-- figure:pipeline -->

- **Crop around the brain, not the image.** A fixed centre crop cut off the striatum, the region that matters, in wide scans. Each scan is cropped around its centre of mass instead.
- **Never flip left and right.** Abnormality is often one-sided, and mirroring a scan would blur that signal.
- **Two different model families.** The tree model on hand-built striatal measurements is weaker alone. But its outputs correlate only 0.821 with the CNN's, so it is wrong on different scans. It carries 34% of the weight in the final stack, and adding it cut log loss by 0.0184 at 3.3 sigma [drivendata-dat-parkinsons-challenge].
- **Let the stack do the calibration.** The stack's CNN weight sits below 1, which works like temperature scaling. So there is no separate calibration step to fit and maintain.
- **Choose calibrators out of sample.** Early on, isotonic regression was picked because it had been scored on its own training predictions. Under cross-validation it did worse than no calibration: 0.3520 against 0.3271 log loss [drivendata-dat-parkinsons-challenge].

## Result

<!-- figure:quality -->

The final model ranks scans well: out-of-fold AUROC 0.9455 [drivendata-dat-parkinsons-challenge]. AUROC is the chance that a random abnormal scan scores above a random normal one; 1 is perfect. The CNN ensemble's probabilities are close to honest. ECE, the average gap between predicted probability and the rate actually observed, is 0.0187 for the CNN ensemble. For the baseline, calibrating each family with a temperature fitted only on the other families cost just +0.0006 log loss overall, so the calibration carries over to acquisitions it was not fitted on [drivendata-dat-parkinsons-challenge].

The weak spots are the small families. The 30-scan 1.5 mm family and the pooled small families have the lowest AUROC and the highest ECE, so a probability on an uncommon acquisition deserves less trust. The per-family breakdown exists only for the baseline, and every family was seen in training [drivendata-dat-parkinsons-challenge]. On the leaderboard my entry finished #159 of 1009 (top 16%), with private scores worse than public by a similar margin for every build [drivendata-dat-parkinsons-challenge].

## What I learned

- **Diversity beats quality in a stack.** The trees and the second CNN run were each weaker alone, yet they gave the largest gains, because their errors fell in different places.
- **Pooled calibration hides the groups that matter.** The baseline looked well calibrated on all scans together, yet its ECE on the 30-scan 1.5 mm family was 0.1552 [drivendata-dat-parkinsons-challenge]. I only broke results down by family for the baseline, so I cannot say whether the final model closes that gap.

## Tools

Python, PyTorch, LightGBM, scikit-learn, NumPy, pandas, SciPy, pytest, Docker, Claude Code. The assistant never saw competition data. It wrote scripts and received only aggregate summaries.

## Links

- Competition: https://www.drivendata.org/competitions/311/dat-parkinsons-challenge/
- Code repository: https://github.com/feitandodatascience/dat-parkinsons-challenge

## Sources

- drivendata-dat-parkinsons-challenge
